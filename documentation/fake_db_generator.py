import json
import pokebase as pb
import random
import requests



"""
prod_json = open('API/JSON/products.json', 'rb')
data = json.load(prod_json)

for i in data:
    print(i)
"""

with open('API/JSON/products.json','r+') as file:
    file_data = json.load(file)

    for i in range(1, 954):
        if (requests.get(f"https://pokeapi.co/api/v2/item/{i}/").status_code != 404):

            s = pb.item(i)

            prod = {
                'p_uid': str(i).zfill(2),
                'seller': 'Prof. Chen',
                'title': s.names[3].name,
                'stock': random.randrange(250),
                'description': s.effect_entries[0].effect,
                'images': [s.sprites.default],
                'category': 'pokemonItems',
                'comments': [],
                "notation": round(random.random()*5, 2),
                'price': s.cost,
            }
            file_data.append(prod)
            
            file.seek(0)
            json.dump(file_data, file, indent = 4)





