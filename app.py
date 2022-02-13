from flask import Flask, render_template, url_for, request
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'

class pbwForm(FlaskForm):
    
    clientID = StringField('Client ID: ie ABC123',validators=[DataRequired()])
    retrieve = SubmitField('Retrieve from NAB Transact')
    businessName = StringField('Trading Name:')
    abn = StringField('ABN:')
    billerID = StringField('Biller ID:')
    note= StringField('Note:')
    type= SelectField('Type:', choices=['','Council', 'School', 'Utility', 'ISP', 'Other'])
    state= SelectField('State:', choices=['','ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'])
    submit = SubmitField('Create Biller')
    

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/upload',methods=['POST', 'GET'])
def upload():
    return render_template("upload.html")

@app.route('/pbwform/', methods=['POST', 'GET'])
def pbwform():
    print("Andrew - you are a winner")
    businessName=None
    clientID=None
    form = pbwForm()
    return render_template("pbwform.html",form=form)
    
        


@app.route('/result',methods=['POST', 'GET'])
def result():
    output = request.form.to_dict()
    name = output["name"]
    invoice = output['invoice']
    linvoice = invoice.lower() #convert to lowercase
    npinvoice = linvoice.replace(" ","") #remove spaces
    Linvoice = npinvoice[:10] #get first 10 characters
    return render_template('index.html', name = name, invoice = Linvoice)
   






    

if __name__ == "__main__":
    app.run(debug=True)