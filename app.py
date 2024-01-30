from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import config

app = Flask(__name__)
CORS(app) 

API_KEY = str(config.API_KEY)

@app.route('/search', methods=['GET'])
def search():

    url = "https://api.yelp.com/v3/businesses/search"

    headers = {"Authorization": f"Bearer {API_KEY}"}

    location = request.args.get('location')
    radius = int(request.args.get('radius')) * 1600
    limit = int(request.args.get('limit'))

    parameters = {
        'location': location,
        'term': 'food',
        'categories': 'african',
        'radius': radius,
        'limit': limit
    }

    response = requests.get(url, headers=headers, params=parameters)
    response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
    results = response.json()['businesses']

    restaurant_results = []

    try:
        for restaurant in results:
            restaurant_results.append({
                'id': restaurant['id'],
                'alias': restaurant['alias'],
                'name': restaurant['name'],
                'address': f"{restaurant['location']['address1']}, {restaurant['location']['city']}, {restaurant['location']['state']} {restaurant['location']['zip_code']}",
                'phone': restaurant['display_phone'] if restaurant['display_phone'] else 'N/A',
                'price': restaurant['price'] if 'price' in restaurant else 'N/A',
                'category': restaurant['categories'][0]['title'],
                'rating': f"{restaurant['rating']}/5.0 with {restaurant['review_count']} Reviews",
                'image' : restaurant['image_url'],
                'alt': f"image of {restaurant['name']} from yelp!"
            })

        return jsonify(restaurant_results), 200
    except Exception as error:
        print('ERROR: %s', error)
        return jsonify({'error': str(error)}), 500


@app.route('/businesses/<string:alias>', methods=['GET'])
def details(alias):
    try:
        url = "https://api.yelp.com/v3/businesses"
        headers = {"Authorization": f"Bearer {API_KEY}"}
        
        print(alias) 
        if not alias:
            return jsonify({'error': 'Business id/alias is required.'}), 400

        response = requests.get(f"{url}/{alias}", headers=headers)
        response.raise_for_status()
        result = response.json()


        restaurant_details = {
            'name': result['name'],
            'image': result['image_url'],
            'phone': result['display_phone'] if result['display_phone'] else 'N/A',
            'photos': result['photos'],
            'reviews': result['review_count'],
            'url': result['url'],
            'address': f"{result['location']['address1']}, {result['location']['city']}, {result['location']['state']} {result['location']['zip_code']}",
            'alt': f"image of {result['name']} from yelp!"
        }

        transaction_list = result['transactions']
        transaction_types = []

        for transaction in transaction_list:
            transaction_types.append(transaction.capitalize() + " ")

        restaurant_details['transactions'] = transaction_types
        print(transaction_types)

        categories_list = result['categories']
        categories_titles = []

        for category in categories_list:
            categories_titles.append(category['title'] + " ")


        restaurant_details['categories'] = categories_titles
        print(categories_titles)

        

        return jsonify(restaurant_details), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 500
    

@app.route('/businesses/<string:alias>/reviews', methods=['GET'])
def reviews(alias):
    try:
        url = "https://api.yelp.com/v3/businesses"
        headers = {"Authorization": f"Bearer {API_KEY}"}
        
        print(alias) 
        if not alias:
            return jsonify({'error': 'Business id/alias is required.'}), 400

        response = requests.get(f"{url}/{alias}/reviews", headers=headers)
        response.raise_for_status()
        result = response.json()['reviews']

        return jsonify(result), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True)

