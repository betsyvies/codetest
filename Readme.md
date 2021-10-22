# Welcome CodeTest

CodeTest is a web service to keep track of the IP addresses that are making the most requests to your service each day.

Happy learning and coding!!!

## Getting started

- Install dependencies: `npm install`
- Development server: `node index and curl localhost:8080`

## Questions

What would you do differently if you had more time?
- I would like to have used the express library, also show a table of all IPs in console and add commands to see the 100 most used IPs or the number the user wants.

How complex is the execution of each function?
- That it is synchronous and has several conditions to analyze, also that at one point there is a loop.

How does your code work?
- Receiving each IP and then adding it to a map as a key and with a value of 1 if it has not yet been added, if it already exists within the map it will bring its previous value and add it plus 1, then save the value. To get the top 100, it will pass the key and value of the IP, in this function it will first evaluate if the top 100 map already has a size of 100, if not it will add the key and value of the IP. Otherwise, it will validate if the key already exists, if it does, it will replace the new value. If it does not exist in the map, it will be analyzed if its value is greater than any of the IPs already stored. These maps are cleaned every day. 

What other approaches have you decided not to pursue?
- I decided not to use arrays or objects because they are less efficient, since they are not easy to remove from memory.

How would you test it?
- Doing unit tests and mocking, this before testing on a real app.