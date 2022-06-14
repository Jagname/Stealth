from mcstatus import JavaServer
from mcstatus import BedrockServer

def get_server_status(server_ip, minecraft_edition):
    if minecraft_edition == 'java':
        return JavaServer.lookup(server_ip).status()
    else:
        return BedrockServer.lookup(server_ip).status()

def get_availables_versions(ip, edition):
    status = get_server_status(ip, edition)
    return status.version.name
