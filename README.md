# Vote-Tracker
This is an app that allows users to vote on their preferred item, stores the vote, and displays the totals in a graph using the canvasJS library.

Vote Tracker Components:

Object: Favorite
Properties: Image, Name/Label, Votes/y

Array: Favorite Items

Process:
    Display 2 random items (ensure that 2 of the same item isn't displayed at the same time)
    Record favorite vote
        capture the click event on the pictures
        update the vote total for the clicked item by incrementing it by 1
    Update the chart
        be sure to call chart.render()
    Repeat process
