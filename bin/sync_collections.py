import requests
import json
import os

complete = False
page = 1

query = "https://collections.leventhalmap.org/search?utf8=✓&f_inclusive[destination_site_ssim][]=argo&format=json"

def parse_collection_record(doc):
    filename = "../src/content/maps/{}.json".format(doc["id"])
    
    with open(filename, "w") as f:

        jsonContent = {"argoMetadata": {}, "dcMetadata": doc}
        json.dump(jsonContent, f)





while not complete:
    print ("Hi")
    r = requests.get("{}&per_page=100&page={}".format(query, page))

    j = r.json()

    for doc in j["response"]["docs"]:
        parse_collection_record(doc)

    if j["response"]["pages"]["last_page?"]:
        complete = True
    else:
        page = page + 1





