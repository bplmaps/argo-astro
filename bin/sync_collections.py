import requests
import json
import os

complete = False
page = 1

query = "https://collections.leventhalmap.org/search?utf8=✓&f_inclusive[destination_site_ssim][]=argo&format=json"

bboxes = []

def parse_collection_record(doc):
    filename = "../src/content/maps/{}.json".format(doc["id"].replace(":","__"))
    
    with open(filename, "w") as f:

        jsonContent = {"argoMetadata": {}, "dcMetadata": doc}
        json.dump(jsonContent, f, sort_keys=True, indent=4, separators=(',', ': '))

        try:
            if doc["subject_bbox_geospatial"]:
                e = {"id": doc["id"], "bbox": doc["subject_bbox_geospatial"][0]}
                bboxes.append(e)
        except:
            pass



while not complete:
    print ("Page")
    queryUrl = "{}&per_page=100&page={}".format(query, page)
    print(queryUrl)
    r = requests.get(queryUrl)

    j = r.json()

    for doc in j["response"]["docs"]:
        parse_collection_record(doc)

    if j["response"]["pages"]["last_page?"]:
        complete = True
        
        with open("../src/assets/map-bboxes.json", "w") as f:
            json.dump(bboxes, f, sort_keys=True, indent=4, separators=(',', ': '))
    else:
        page = page + 1




