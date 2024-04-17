Alexander Breeze
Apropos project
leaflet simple demo

Task # 1  Simple Web Map
Create a self contained HTML web map using Leaflet that 
allows users do to the following things:
 - Create new points, lines or areas
 - Edit features
 - Delete features
 - Add a multi-line text element to the features
 - Provides the means for the text on the features to be searched

Notes:
-The css could definitely be improved, but doing so is a tedious and menial task. Technologically, my code meets all the requirements.
-The tool selection should have a dynamic visual to show which tool you selected, something like adding a border to the current element.
 This requires handling both clicking and hotkey selection, and centering the tool icons (more css).
-For placing lines/areas, you click to make points. Hit esc to cancel it, or enter / any other key to finish so you can make another one, as per the tooltips
-To edit lines/areas I had to import an editable library. I set each one to editable when created. It would be better to toggle that when you
 select it, as the editiable feature adds annoying boxes. Alternatively I could figure out how to make them invisible in the library.
-For deleting you use the trash tool. Additional functionality would allow you to select an element and then hotkey delete / backspace, which would
 be faster for single deletions but slower for mass deleting.
-For comments I used tooltips, do </br> for newline. I am unsure if you wanted popups instead, but since comment elements get saved externally in the 
 comments[] list regardless, swapping over to popups would not incur significant increases in complexity. 
 In addition the search results already partially demonstrate my DOM manipulation skills.
-For comment searching, once again the css could use work, but it correctly searches through comments and clicking on them focuses on the corresponding
 element. I also make sure to delete comments when their corresponding element is removed (easy to miss!).




Task # 2  Extending the design
Imagine that after deploying your solution for Task #1 the requirements changed. 
In the new requirements it is now necessary to allow for multiple features to be associated with a 
block of text and to allow for multiple text blocks to be associated with a feature. 
In the case of this change, describe using text, supplemented with diagrams where needed, 
what are some of the design considerations that would need to be made and how would you approach 
solving and implementing them. Please take some time to focus on how you would present this new 
feature to non-technical users in a way that would be easily understood and used.

-Switching to Popups: Currently, each element (e.g., marker, line, area) has a tooltip associated with it, allowing for only one comment per element
and only one element per comment. To accommodate multiple comments for each element we should transition from tooltips to popups. 
Popups provide a more robust interface for displaying multiple comments in a visually appealing manner, since they are separate elements not just 
accentuations to existing elements, and as such they can be more easily extended to a web of comment:element relations. 

Open fig1.png for a visual demonstration

-Handling Multiple Element Associations: With the new requirement, each comment may reference multiple elements, and conversely, each 
element may have multiple associated comments. This necessitates a rethinking of how comments are linked to elements. Currently it is a list of
comments and their related element, but with the new change we would need each element to list all of its comments and vice versa (for O(1) time access).
We can represent this relationship using two dictionaries (one for elements, one for comments), where each entry has a list of its correspondants. 
Here is some pseudo-code to show this dataset:
var elementsToComments = {element1: [comment3, comment5, comment6], element2: [comment3, comment7]}
var commentsToElements = {comment3: [element1, element2], comment5: [element1], comment6: [element1], comment7: [element2]}
These two datasets could also act as our lists of elements and comments respectively.

-Enhancing Comment Searching: Currently, selecting a search result automatically focuses on the corresponding element. However, with 
comments now referring to multiple elements, this behavior becomes problematic. To address this we can implement a more robust approach. 
Upon selecting a search result, the map will center itself between the maximum and minimum latitude and longitude of all the elements in question,
then zoom out until they are all in frame.

Open fig2.png for a visual demonstration

-Managing Multiple Comments per Element: To make it more visually pleasing when handling multiple comments, we can move them from a map
overlay popup to a side channel, like the chat function in a livestream. This is especially important for massive comments, such as copy+paste
of entire text documents concerning a region

Open fig3.png for a visual demonstration



Task # 3  Statement of Interest
Given that Indeed does not require a cover letter, please provide a few paragraphs describing why you are 
interested in working with Apropos Information Systems and what particular skills or experience you possess 
that would make a good addition to our team.

I am a recent graduate of Carleton University, with a bachelors in computer science specialising in artificial intelligence. 
I graduated with a 3.93 GPA, which is to say straight A's with an A+ average. 
That highlights my ability to solve problems independently, learn quickly and get assignments done routinely ahead of time. 

I am looking for a small team that is open to hire me, so I can have a more direct impact on products that people will actually use. 
Looking at your current members, I see the technologies listed are mostly ones I have lots of experience with already 
Python: extensive scripting experience, including web servers and machine larning
Bootstrap: Used as the basis for various react modules
JS: multiple fullstack web servers, including fully functional video player UI's
Leaflet: This code demo
SQL: University projects, web servers 
So I shouldn't have any problems integrating with your current tech stack and quickly beginning to provide value. 
Your existing products seem quite diverse in their applications, including GIS, general planning, and even an NP solver. 
This attracts me since the opportunity to handle a diverse array of applications means for a more dynamic workflow which would keep things interesting.
I also have an interest in P vs NP, having made numerous SAT solvers and a maximal subset solver, as well as other attempts to prove it. 
As such I am quite interested in your Marxan tool. I would love to know what algorithm you used, and how it improves on existing solvers.

As for what I can do for you, I have 5 years of history with school and internships, in which I completed every assignment ahead of time, regardless of
teacher, topic or teammates. In other words, I have 5 years of history of performing flawlessly in a wide variety of both coding and even non-coding roles.
When faced with challenges I am unprepared for, such as my first coop where I was tasked with making a full JS website and UI with no experience in frontend, 
I was able to self-teach new technologies in a very short timespan and have the project done in under a month.
I also have a wide variety of experience from school, work and personal projects, including 3D mesh algorithms, discrete math (was a TA in uni), 
artificial intelligence (multiple repos, e.g. image classification), user interfaces, data handling and ethics, 
which I could apply to future projects as you look to further diversify your offerings.

Aside from tech stacks, I have collaborated on many teams in university, even leading a fair few of them in order to complete class assignments.
I always did more than my fair share, encouraging communication and mutual code reviews while keeping us on track to be done on time, which we always were.

Thank you for giving me the opportunity to demonstrate my skills. Regardless of the result, this code test was a great exercise.
-Alex