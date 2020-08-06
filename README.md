= PINTEREST CLONE =

# Firebase Deployed App

https://pinterestclone-ddaf2.web.app

# Description

This is a rudimentary clone of Pinterest, using Firebase as the backend storage. It features full CRUD capabilities, and also is contextual to a specific user (i.e. only boards which were created by the current user are viewable).

== CRUD: ==

**CREATE**

1. Users can create boards
2. User can create pins

**READ**

1. Boards are read from Firebase and shown
2. Pins are read from Firebase and shown on their assigned boards
3. Join table which matches boards to pins is read to know which board a pin is assigned to

**UPDATE**

1. Pins can be edited (title and URL)
2. Pins can be moved to a different board

**DELETE**

1. Boards can be deleted. This deletes any associated pins currently assigned to that board, and also cascades the deletion to the join table records for those pins as well.
2. Individual pins can be deleted. This cascades the deletion to the join table records for that specific pin.
