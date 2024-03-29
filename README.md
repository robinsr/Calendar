
Calendar
========

A Simple web calendar in the vein of TodoMVC

See the app: https://robinsr-calendar.herokuapp.com/

I want to remake this app using various technologies/frameworks to showcase
the differences in implementation between them. 

The basic requirements for each version are as follows:

* Should render
* It should look ~~nice~~ ok
* Days should be numbered correctly
* Days in the month should be visually distinct from leading/trailing days
* Days should list events that happen on that day
* Clicking an event shows a detail modal
* Dragging an event to a different day moves the event and updates the event details

Extras:

* It should look ~~really~~ nice, and have animations
* It should have some sort of URL routing
* It should have tests
* It should load events from a service
* It should persist changes to events
* It should allow additional events to be added

Builds:

There is a lot of shared build logic in `/febs` and each version's gulp file simply configures the build system to transform files in a certain way. Each build is based on browserify. There is both a prod and dev bundle tasks. 

TravisCI builds the JS bundles and runs the unit tests, and only after a successful build does heroku deploy the new version. 

TODOS

* ~~Vanilla~~ 
* ~~Backbone~~
* ~~Angular~~
* Ember
* ~~React/Flux~~
* web components
* ~~Vanilla ES2015~~
* ~~CRUD service~~
* SSR only 

## Framework Comparison

| framework | Lines of code | Bundle size |
|-----------|---------------|-------------|
| Vanilla   | 318           | 58kb        |
| Backbone  | 298           | 212kb       |
| Knockout  | 353           | 233kb       |
| Angular   | 320           | 360kb       |
| React     | 321           | 514kb       |

