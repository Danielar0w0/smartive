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

        response = requests.get("{}/middleware/devices/sensors".format(self.api_url), headers=self.request_headers)
        
        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.getNewToken()
            return None

    def getAvailableDevices(self):

        response = requests.get("{}/public/devices/available".format(self.api_url), headers=self.request_headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.getNewToken()
            return None

    def addAvailableDevices(self, device):

        response = requests.post("{}/middleware/devices/available".format(self.api_url), json=device, headers=self.request_headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.getNewToken()
            return None


    def putDeviceState(self, device):

        response = requests.put("{}/middleware/devices/sensor".format(self.api_url), json=device, headers=self.request_headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.getNewToken()
            return None

    def getNewToken(self):
        
        request_body = {
            'username': self.username,
            'password': self.password
        }

        print('Requesting new access token...')

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
