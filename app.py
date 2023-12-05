from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)


@app.route('/load_item_name', methods=['GET'])
def load_item_name():
    item_name_dict = {0: 'Pork Ramen', 1: 'Chicken Ramen', 2: 'Miso Ramen', 3:'Kara Miso Ramen',
                  4: 'Pork Chashu', 5: 'Chicken Chashu', 6: 'Pork Chashu Rice', 7: 'Chicken Chashu Rice',
                  8: 'Katsu', 9: 'Chicken Wing', 10: 'Karaage', 11: 'Korokke'}
    return jsonify(item_name_dict)


@app.route('/load_item_price', methods=['GET'])
def load_item_price():
    item_price_dict = {0: 14, 1: 14, 2: 15, 3:16,
                       4: 6, 5: 6, 6: 8, 7: 8,
                       8: 10, 9: 8, 10: 8, 11: 5}
    return jsonify(item_price_dict)


@app.route('/load_item_pic', methods=['GET'])
def load_item_pic():
    item_pic_dict = {0: "ramen-1.png", 1: "ramen-1.png", 2: "ramen-2.png", 3:"ramen-2.png",
                       4: "pork_chashu.png", 5: "chicken_chashu.png", 6: "chashu_rice.png", 7: "chashu_rice.png",
                       8: "fried_pork.png", 9: "fried_chicken_wing.png", 10: "karage.png", 11: "colapin.png"}
    return jsonify(item_pic_dict)


@app.route('/load_cata', methods=['GET'])
def load_cata():
    cata_dict = {0: 'Ramen', 1: 'Chachu', 2: 'Fried'}                  
    return jsonify(cata_dict)


@app.route('/order_complete')
def order_complete():
    return render_template('order_complete_page.html')


@app.route('/')
def start():
    return render_template('Start_page.html')


@app.route('/menu')
def menu():
    return render_template('menu.html')



if __name__ == '__main__':
    app.run()