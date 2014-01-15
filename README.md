###Emendo
#####Data Consistency Checks for osm.org

Emendo is a fork of KeepRight, rewritten in nodejs that focuses on a new and revitalized user interface that follows in the wake of the new osm.org UI.

The project is broken up into two components. The first is the `web` component which handles all of the browser & api based client interactions with the database.

The second component is the `checks`. This runs on a separate server and handles downloading `planet.osm` and the daily diffs. Once downloaded, it is then responsible for populating the errors database base accessed by the `web` component of the project.
