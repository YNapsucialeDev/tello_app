import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit 
{
	//global variables
	socket: any;
	socketConn: string = 'CONNECTION NOT ESTABLISHED';
	message: string;
	roll: any;
	pitch: any;
	yaw: any;
	xvel: any;
	yvel: any;
	zvel: any;
	height: any;
	bat: any;
	msnm: any;

	constructor()
	{
		//creating web socket connection on port 5000
		this.socket = new WebSocket('ws://localhost:5000');
	}
	
	ngOnInit()
	{
		//initialize comm with socket on p 5000
		this.socket.onopen = function()
		{
			this.socketConn = 'SOCKET CONNECTION ESTABLISHED';
		}

		//Error logger
		this.socket.onerror = function(error)
		{
			console.log('WEB SOCKET ERROR', error);
			this.socketConn = 'SOCKET CONNECTION ERROR, PROBABLY LOST';
		}

		//display socket messages from server
		this.socket.onmessage = (msg) =>
		{
			this.socketConn = 'SOCKET CONNECTION ESTABLISHED';
			this.message = msg.data;
			let explodedMsg = this.message.split(';');
			this.roll = explodedMsg[0];
			this.pitch = explodedMsg[1];
			this.yaw = explodedMsg[2];
			this.xvel = explodedMsg[3];
			this.yvel = explodedMsg[4];
			this.zvel = explodedMsg[5];
			this.height = explodedMsg[9];
			this.bat = explodedMsg[10];
			this.msnm = explodedMsg[11];
		}
	}
}
