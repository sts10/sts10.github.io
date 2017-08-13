+++
title= "How We Used the Data-Remote=True Pattern for AJAXing New Comments in XP"
date= "2014-04-12 13:20:35 -0400"
comments = "true"
+++

For [xp](http://get-xp.herokuapp.com/) ([GitHub Repo](https://github.com/kronosapiens/xp)), our skillshare-like web app for the Flatiron community, Daniel and I knew that we had to make it easy for students and teachers to coordinate lesson logistics. They would need a place and a way to hash out details like what a lesson would cover, where and when it would meet, how long it would last, etc. One way I thought we could do this is to give users the ability to comment on individual lessons. 

Once I had the comments up and running without using AJAX, we decided to go one step further and use AJAX to post new comments, so that the lesson's show page would not refresh. To do this, we used a really cool pattern that Avi showed us a few weeks ago that I'll call "data remote true". 

<!-- more -->

### What This Does

This pattern allows you to easily make an HTML link or form fire an AJAX request in the background (i.e. without reloading the page) and execute some jQuery to change the layout of the page. 

The use-case I'll be talking about here is a new comment form that (1) adds a comment to a database (connected to a Rails app) via an AJAX request and (2) adds the text of the comment to the comment section via a jQuery callback, all while not not reload the entire webpage.

### A Generalized Overview of the Data Remote True Pattern

When I say "data remote true" what I'm directly referring to is a universal jQuery listener built into Rails. Below is a rough approximation of what the listener looks like:

```javascript
$(document).on("click", "a[data-remote=true]", function(e){
    e.preventDefault();
    $.getScript($(this).href())
});

$(document).on("submit", "form[data-remote=true]", function(e){
    e.preventDefault();
    $.getScript($(this).attr(action))
});

```

As you can see, there are really two listeners-- one for HTML links (the `<a>` tag) and one for HTML forms. Both of them listen to your entire document, but only fire their functions when an `<a>` tag is clicked or a form is submitted that has a `data-remote` attribute set to `true`. The functions they fire do two things: 

1. `e.preventDefault();` overrides the HTML tags' default behavior-- for a link that would be taking the user to the URL in the `href` attribute, for a form the default behavior is making a POST or GET request to the URL of the `action` attribute.  
2. The second line of the functions, `$.getScript($(this).href())`, is slightly more complicated. [$.getScript()](https://api.jquery.com/jQuery.getScript/) is a jQuery method that's shorthand for an AJAX request for Javascript. So Rails will make an AJAX call to your controller action, but with format js. We'll see what Rails does with this, and how we'll use it, in a minute.

To apply these listeners to a specific link or form, we simply added `data-remote=true` as an attribute (hence the phrase I'm using to describe this pattern) in the HTML tag. 

```
<a href="/lists" data-remote="true">AJAX LINK</a>

<form action="/tasks" data-remote="true">
</form>
```


### Adding Comments

Cool, so now let's look at how we used this pattern in xp, namely for adding/posting new comments to a lesson.

Step 1: Set the data-remote attribute on the new comment form to true. Since we're using a form_for on a nested resource (`@comment`), that looks like this:

```erb
  <h4>Leave a New Comment</h4>

  <%= form_for [@lesson, @comment], {role: "form", remote: true} do |f| %>
    <% if @comment.errors.any? %>
      <div class="alert alert-warning">
        <% @comment.errors.full_messages.each do |msg| %>
          <p><%= msg %></p>
        <% end %>
      </div>
    <% end %>
    <div class="form-group">
      <textarea class="form-control" name="content" placeholder="Write your comment here"></textarea>
    </div>
    <input type="submit" value="Post Comment" class="btn">
  <% end %>

</div>
```

Note: `role: "form"` is simply a Bootstrap setting. We're obviously concerned with the `remote: true` attribute setting. To review: Now this form will NOT make it's usual POST request, but instead look for Javascript through AJAX. 

Step 2: Jump to the comments controller, specifically the `create` method, as per the `form_for`. But remember, `data-remote = true` makes Rails look for a js file, rather than an HTML response. 

```ruby
def create
  @comment = Comment.new(:user => current_user, :lesson_id => params[:lesson_id], :content => params[:content])
  @lesson = Lesson.find(params[:lesson_id])

  if @comment.save
    respond_to do |format|
      format.html { redirect_to @lesson }
      format.js {}
    end
  else
    flash[:alert] = "Comment failed to save..."
    
    render "lessons/show"
  end
end 
```

Above is the create method from the comments controller. The key lines are inside the `if @comment.save` branch. If the comment is successfully saved, if the call wants HTML, we `redirect_to @lesson`. But if the call wants Javascript (i.e. what we've told it to look for), we have a pair of curly braces with nothing in them: `{}`. Strange, no? But this is actually a key part of the data remote true pattern.

When we put nothing in the curly braces we are counting on Rails' sensible default, which is to look in this controller's corresponding view directory for, in this case, a file called `create.js.erb`. 

(This is exactly the same Rails default we rely on when we make a controller `show` method and, once we find the instance of what we're showing, let Rails find the proper HTML view.)

Rails is going to run whatever Javascript is in `create.js.erb` after the new comment has been saved to the database. Because of this, it's referred to as a callback. 

In the case of posting a new comment, we're going to do 2 things: (1) use jQuery to add the new comment to the comment section, and (2) clear the new comment textarea. 

```javascript
addCommentToLesson("<%= j render @comment %>");
$("form#new_comment textarea").val("");
```

Line 2 clears the textarea in `<form id="new_comment">`. Pretty simple, but necessary in "tricking" the user into making it look like the form is being submitted as usual. 

Line 1 is a bit more tricky. Let's start with the `@comment` instance variable. Just like with normal, good ole .html.erb views, we have access to instance variables we set in the controller action. Indeed, if you look back at the comments controller code above, we see the very first line does just this:

```
@comment = Comment.new(:user => current_user, :lesson_id => params[:lesson_id], :content => params[:content])
```

As you can see, `@comment` is the comment we just created and saved, constructed from params.

But, importantly, `@comment` is also referring to a partial, namely `_comment.html.erb`, which we use to render comments. It's pretty basic HTML ERB. Here it is in part for reference:

```erb
<div class="comment" id="comment_<%= comment.id %>">
  <p>
    <%= image_tag(comment.user.image_url, size: "30", alt: comment.user.name) %> 
    <small>
      <%= link_to comment.user.name, user_path(comment.user.nickname) %> posted on <%= comment.created_at.to_formatted_s(:long_ordinal) %>: 
    </small>
    <br>
    <strong><%= comment.content %></strong>
  </p>
</div>
```

This helps illuminate what `<%= j render @comment %>` does. `render` just says to render the partial. The j in front escapes any quotation marks or other characters to make the rendered HTML safe for Javascript (hence the `j`). So basically we're passing a long HTML string, with necessary characters escaped, into a Javascript function called `addCommentToLesson`. 

`addCommentToLesson` is defined in `app/assets/javascripts/comments.js`. 

```javascript
function addCommentToLesson(comment_html){
  $("#comments-section").append(comment_html)
};
```

It takes a string of HTML as an argument and, with the jQuery function `append`, dynamically appends that HTML to a CSS element with an ID of `comments-section`, which is where our comments live. This is what makes it look like the comment has been added to the page to the user. 

Here's the div the an id of `comments-section` located in the lesson show.html.erb view: 

```erb
<div id="comments-section">
  <%= render @lesson.comments %>
</div>
```

That `render` call is made when the show view is loaded initially, to show comments that are already in the database. We really just care about the div. When the current user adds a new comment, we want to `append` new comments after any previously-saved comments. 

### A Slight Hiccup

Unfortunately, we are having a problem with this implementation. Currently, if a user has Javascript disabled in the browser for any reason, the controller should respond with HTML rather than Javascript, which should submit the form, refresh the page, and redirect_to to @lesson. However the form is currently throwing an error when we do this. We're planning on looking into it. 

I think that's about it. The feature is working as described live on [xp](http://get-xp.herokuapp.com/). Hopefully I'm not forgetting anything. 


