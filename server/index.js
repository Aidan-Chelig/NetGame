import { Users } from './users';
import tcpserver from './tcpserver';

var userlist = new Users();

tcpserver.SetUsers(userlist);
tcpserver.Start(3000);
