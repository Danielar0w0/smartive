import os
import requests

class ApiHandler:

    def __init__(self) -> None:
        self.token = ''
        self.api_url = "{}:{}".format(os.environ.get('API_ADDRESS'), os.environ.get('API_PORT'))
        self.username = os.environ.get('API_USER')
        self.password = os.environ.get('API_PASS')
        self.request_headers = { 'Authorization': 'Bearer ' + self.token, 'Content-Type': 'application/json' }
        self.tries = 0

    def getMiddlewareSensors(self):

        request = requests.get("{}/middleware/devices/sensors".format(self.api_url), headers=self.request_headers)
        
        if request.status_code == 200:
            return request.json()
        elif request.status_code == 401:

            print('Requesting new access token...')
            
            self.getNewToken()
            return None

    def getNewToken(self):
        
        request_body = {
            'username': self.username,
            'password': self.password
        }

        request = requests.post("{}/public/login".format(self.api_url), json=request_body)

        if request.status_code == 200:

            self.token = request.json()['token']
            self.request_headers['Authorization'] = 'Bearer {}'.format(self.token)
            self.tries = 0

            print('Got new token for Admin')
            print(self.token)
        
        else:

            if self.tries < 5:
                self.tries += 1
                self.getNewToken()
