import http.server
import socketserver
import json
from dataclasses import asdict
from matrix import Matrix
from matrix_structure import MatrixStructure
from user_data import UserData
from server_response import ServerResponse 
from custom_ast import execute
from typing import Tuple

def load_userdata(string):
    json_object = json.loads(string)

    collection =  tuple(map(lambda item: MatrixStructure(
        item['name'],
        Matrix(item['data']['values'], item['data']['rows'], item['data']['columns']).to_numpy()
    ), json_object['collection']))
    equations =  json_object['equations']

    return UserData(collection, equations)

def evaluate(equations, collection):
    return execute(equations, collection)

def dump_response(response):
    return json.dumps(asdict(response))


class SimpleHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def handle_error(self, code: int, message: str = None):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Vary', 'Origin')
        self.end_headers()

        response = { 'success': False, 'code': code, 'message': message }
        self.wfile.write(dump_response(ServerResponse(**response)).encode('utf-8'))
    
    def handle_response(self, collection: Tuple[MatrixStructure]):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Vary', 'Origin')
        self.end_headers()

        response = { 'success': True, 'collection': collection }
        self.wfile.write(dump_response(ServerResponse(**response)).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        message = self.rfile.read(content_length).decode('utf-8')
        
        try:
            userdata = load_userdata(message)
            collection = evaluate(userdata.equations, userdata.collection)
        except Exception as e:
            self.handle_error(500, str(e))
        else:
            self.handle_response(collection)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header("Vary", "Accept")
        self.end_headers()


if __name__ == '__main__':
    PORT = 6969 # You can change this to any available port you prefer

    with socketserver.TCPServer(('', PORT), SimpleHTTPRequestHandler) as httpd:
        print(f"Server started at port {PORT}")
        httpd.serve_forever()