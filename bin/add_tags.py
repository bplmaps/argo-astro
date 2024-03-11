import sys
import csv
import json

inData = sys.stdin.buffer.readlines()
reader = csv.DictReader(line.decode('utf-8-sig') for line in inData)

idx = {"features": {}, "subjects": {}, "empires-and-nations": {}, "languages": {}}

for row in reader:
    for facet in list(idx.keys()):
        try:
            if row[facet]:
                facet_categories = row[facet].replace(" ","").split(",")

                for facet_category in facet_categories:
                    
                    try:
                        if idx[facet][facet_category]:
                            idx[facet][facet_category].append(row['commonwealth_id'])
                    except:
                        idx[facet][facet_category] = [row['commonwealth_id']]

        except:
            pass

for facet in list(idx.keys()):
    with open('../src/content/facets/{}.json'.format(facet), 'r') as inFile:
        j = json.load(inFile)
    
    for facet_category in j['facet-categories']:
        # print(idx[facet][facet_category['id']] )
        try:
            if idx[facet][facet_category['id']]:
                facet_category['entries'].extend(idx[facet][facet_category['id']])
        except:
            pass

    with open('../src/content/facets/{}.json'.format(facet), 'w+') as outFile:
        json.dump(j, outFile, sort_keys=True, indent=4, separators=(',', ': '))