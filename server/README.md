TCP Handshake:
SERVER <- CLIENT -- identify client version, "NetGame v 1.0"
SERVER -> CLIENT -- verify client version, send server RSA public
SERVER <- CLIENT -- send client public RSA
Prompt user for login
