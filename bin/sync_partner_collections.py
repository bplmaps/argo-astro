import requests
import json

# not necessarily an easy way to derive this list from the API, so we hard  code it
# will need to add as partners are added
partnerIDs = [
    "commonwealth:z603vf985", 
    "commonwealth:4t64hr20k",
    "commonwealth:hx11xz34w",
    "commonwealth:z603vh48c",
    "commonwealth:mw22z436x",
    "commonwealth:z603vh98k",
    "commonwealth:mc87pw948",
    "commonwealth:z603vn85b",
    "commonwealth:z603vm84v",
    "commonwealth:p8418t36h",
    "commonwealth:41688024w",
    "commonwealth:z603vr25h",
    "commonwealth:j3860802m",
    "commonwealth-oai:1r66p075h"
]

for partner in partnerIDs:
    url = f'https://collections.leventhalmap.org/search/{partner}?format=json'
    r = requests.get(url)
    with open(f'../src/content/partner-collections/{partner}.json', 'w+') as f:
        json.dump( r.json()['response']['document'], f )
