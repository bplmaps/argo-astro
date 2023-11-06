# Tool for migrating old home_data.json structure into distinct facet data files


import json

outFacets = {
    "languages": {
        "filename": "languages.json",
        "content": {
            "title": "Languages",
             "short_description": "Lorem markdownum paterno, sua gemitus defendit quod requirenti patrias. Ademit unda os parabant Gradivus deorum, contentusque Themis annum quisque.",
    "banner_image": "https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:cj82m246q/2154,3799,2134,826/,1200/0/default.jpg",
            "facet-categories": []
        }
    },
    "empires_and_nations": {
        "filename": "empires-and-nations.json",
        "content": {
            "title": "Empires and Nations",
             "short_description": "Lorem markdownum paterno, sua gemitus defendit quod requirenti patrias. Ademit unda os parabant Gradivus deorum, contentusque Themis annum quisque.",
    "banner_image": "https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:cj82m246q/2154,3799,2134,826/,1200/0/default.jpg",
            "facet-categories": []
        }
    },
    "features": {
        "filename": "features.json",
        "content": {
            "title": "Features",
             "short_description": "Lorem markdownum paterno, sua gemitus defendit quod requirenti patrias. Ademit unda os parabant Gradivus deorum, contentusque Themis annum quisque.",
    "banner_image": "https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:cj82m246q/2154,3799,2134,826/,1200/0/default.jpg",
            "facet-categories": []
        }
    },
     "subjects": {
        "filename": "subjects.json",
        "content": {
            "title": "Subject",
             "short_description": "Lorem markdownum paterno, sua gemitus defendit quod requirenti patrias. Ademit unda os parabant Gradivus deorum, contentusque Themis annum quisque.",
    "banner_image": "https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:cj82m246q/2154,3799,2134,826/,1200/0/default.jpg",
            "facet-categories": []
        }
    }
}

tmpFacets = {
}

with open('home_data.json', 'r') as inFile:
    inData = json.load(inFile)


    for (k,entry) in inData['maps'].items():
        tags = entry["map_tags"]
        for tag in tags:
            if( tag["category"] in tmpFacets ):
                if( tag["name"] in tmpFacets[tag["category"]]):
                    tmpFacets[tag["category"]][tag["name"]].append(k)
                else:
                    tmpFacets[tag["category"]][tag["name"]] = [k]
            else:
                tmpFacets[tag["category"]] = {tag["name"]: [k]}
            

    for k, facet in outFacets.items():
        fc = tmpFacets[k]
        for cat_id, cat_contents in fc.items():
            outFacets[k]["content"]["facet-categories"].append( { "id": cat_id.lower().replace(' ','-'), "title": cat_id, "entries": cat_contents } )

        with open(facet["filename"], 'w+') as outFile:
            json.dump(outFacets[k]["content"], outFile)