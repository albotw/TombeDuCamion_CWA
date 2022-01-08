import json
import pokebase as pb
import random
import requests
import hashlib
import os
"""
prod_json = open('API/JSON/products.json', 'rb')
data = json.load(prod_json)

for i in data:
    print(i)
"""

def create_db():

    scriptDir = os.path.dirname(__file__)
    filePath = os.path.join(scriptDir, "./../../JSON/products.json")
    print(filePath)

    scriptDir = os.path.dirname(__file__)


    with open(filePath ,'r+') as file:
        infos_data = {}
        file_data = {}
        print("Fetching data...")
        for i in range(1, 954):
            if (requests.get(f"https://pokeapi.co/api/v2/item/{i}/").status_code != 404):

                s = pb.item(i)
                if len(s.names) > 3:

                    _p_uid = hashlib.sha256(s.names[3].name.encode()).hexdigest()

                    _category = s.category.name
                    _notation = round(random.random()*5, 3)
                    _sales = random.randrange(0, 500)
                    _views = random.randrange(0, 1000)

                    if 'category' not in infos_data.keys():
                        infos_data['category'] = [_category]
                    else:
                        if _category not in infos_data['category']:
                            infos_data['category'] += [_category]

                    if 'best_sales' not in infos_data.keys():
                        infos_data['best_sales'] = [_p_uid]
                    else:
                        if len(infos_data['best_sales']) == 10:
                            for _ in range(10):
                                if file_data[infos_data['best_sales'][_]]['sales'] < _sales:
                                    infos_data['best_sales'].insert(_, _p_uid)
                                    infos_data['best_sales'].pop()
                                    break
                        else:
                            infos_data['best_sales'].append(_p_uid)

                    if 'best_notation' not in infos_data.keys():
                        infos_data['best_notation'] = [_p_uid]
                    else:
                        if len(infos_data['best_notation']) == 10:
                            for _ in range(10):
                                if file_data[infos_data['best_notation'][_]]['notation'] < _notation:
                                    infos_data['best_notation'].insert(_, _p_uid)
                                    infos_data['best_notation'].pop()
                                    break
                        else:
                            infos_data['best_notation'].append(_p_uid)

                    if 'best_views' not in infos_data.keys():
                        infos_data['best_views'] = [_p_uid]
                    else:
                        if len(infos_data['best_views']) == 10:
                            for _ in range(10):
                                if file_data[infos_data['best_views'][_]]['views'] < _views:
                                    infos_data['best_views'].insert(_, _p_uid)
                                    infos_data['best_views'].pop()
                                    break
                        else:
                            infos_data['best_views'].append(_p_uid)

                    prod = {
                        'p_uid': _p_uid,
                        'seller': 'Prof. Chen',
                        'title': s.names[3].name,
                        'stock': random.randrange(250),
                        'description': s.effect_entries[0].effect,
                        'images': [s.sprites.default],
                        'category': _category,
                        'comments': [],
                        "notation": _notation,
                        'price': max(s.cost, 100),
                        "sales": _sales,
                        "views": _views,
                    }
                    file_datas= prod
                    
                    #file.seek(0)
                    #infos.seek(0)

                    print("added product n°", i, " out of 954")

        json.dump(file_data, file, indent = 4)
        #json.dump(infos_data, infos, indent = 4)
        
        print("Got data, closing file")
    

def add_cat_to_db():
    scriptDir = os.path.dirname(__file__)
    filePath = os.path.join(scriptDir, "./../../JSON/products.json")

    file = open(filePath, mode='r')
    DB = json.load(file, encoding="utf-8")
    
    for i in range(len(DB)):
        item_ = pb.APIResource('item', DB[i]['title'])
        DB[i]['category'] = item_.category.name

    file.close()

    file = open(filePath, mode='w')
    json.dump(DB, file, indent = 4, ensure_ascii=False)
    file.close()

add_cat_to_db()
