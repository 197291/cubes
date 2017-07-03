import React, {PureComponent} from 'react';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import {VelocityComponent, VelocityTransitionGroup} from "velocity-react";

import styles from './styles';
import './AppCubes.css';

import image_1 from "../../images/cube_1.jpg"
import image_2 from "../../images/cube_2.jpg"
import image_3 from "../../images/cube_3.jpg"
import image_4 from "../../images/cube_4.jpg"
import image_5 from "../../images/cube_5.jpg"
import image_6 from "../../images/cube_6.jpg"
const images = [image_1, image_2, image_3, image_4, image_5, image_6];

class AppCubes extends PureComponent {
	constructor(props) {
		super(props);
		this.state = this.defaultState();
	}
	
	defaultState = () => {
		return {
			open:       false,
			rounds:     3,
			winner:     '',
			startGame:  false,
			displayBtn: false,
			srcCubes:   [],
			step:       0,
			users:      [
				{
					name:         "Player1",
					totalScore:   0,
					currentScore: []
				},
				{
					name:         "Player2",
					totalScore:   0,
					currentScore: []
				},
				{
					name:         "Player3",
					totalScore:   0,
					currentScore: []
				}
			]
		}
	}
	
	initiallyState = () => {
		const firstState = this.defaultState();
		let winner = 0;
		let nameWinner;
		this.state.users.forEach((item, index) => {
			if (winner < item.totalScore) {
				winner = item.totalScore;
				nameWinner = item.name;
			}
		})
		
		this.setState({...firstState});
		this.setState({
			winner: nameWinner
		})
		this.handleOpen();
	}
	
	displayImage = (values) => {
		const srcCurrentArray = [];    // create accessory array
		values.forEach((item) => {     // add links to accessory array with help  received indexes from values
			srcCurrentArray.push(images[item - 1])
		})
		this.setState({
			srcCubes: srcCurrentArray
		})
	}
	
	generateValueCubes = () => {
		
		let length = 3;
		let sum = 0;
		let num;
		const values = [];
		while (length > 0) {
			num = Math.floor((Math.random() * 6 + 1));
			values.push(num);
			length--;
			sum += num;
		}
		this.setUpScore(values, sum);
	}
	
	setUpScore = (values, sum) => {
		let index;
		if (this.state.step > 2) {
			let fStep = this.state.step % 3;
			switch (fStep) {
				case 0:
					index = 0;
					break;
				case 1:
					index = 1;
					break;
				case 2:
					index = 2;
					break;
				default:
					index = 0
					break;
			}
		} else {
			index = this.state.step;
		}
		let newTotalScore = this.state.users[index].totalScore + sum;
		let newStep = this.state.step + 1;
		let newCurrentScore = this.state.users[index].currentScore.concat([values]);
		let users = this.state.users.map((user, userindex) => {
			if (index === userindex) {
				user.currentScore = newCurrentScore;
				user.totalScore = newTotalScore;
			}
			return user
		})
		
		this.setState({
			users: users,
			step:  newStep
		})
		
		this.displayImage(values);
	}
	
	handlerClickPlay = () => {
		if (this.state.step === 0) {
			this.setState({
				startGame:  !this.state.startGame,
				displayBtn: true
			})
			this.generateValueCubes();
		} else {
			this.initiallyState();
		}
	}
	
	handlerClickNext = () => {
		const lengthGame = (this.state.users.length * this.state.rounds) - 1;
		if (this.state.step <= lengthGame) {
			this.generateValueCubes();
		}
	}
	
	handleOpen = () => {
		this.setState({open: true});
	}
	
	handleClose = () => {
		this.setState({open: false});
	}
	
	render() {
		
		const userList = this.state.users.map((item, key) => { // create list of values fro
			const listItem = item.currentScore.map((item, key) => {
				return <ListItem key={key} primaryText={item.join(" ")}/>
			})
			
			return (
				<div key={key} className="players-item">
					<div className='content'>
						<h2>{item.name}</h2>
						<List>
							{listItem}
						</List>
					</div>
					<h4>Всего очков {item.totalScore}</h4>
				</div>
			)
		});
		
		const listImages = this.state.srcCubes.map((item, key) => {
			return <div key={key} className="wrap-img">
				<img src={item} alt="cubes"/>
			</div>
		});
		
		return (
			<Paper style={styles.paper} zDepth={5}>
				<div className="wrap-players">
					<div className="wrap-players-item">
						{userList}
					</div>
				</div>
				<div className="row-btn">
					<RaisedButton
						className="btn"
						label={this.state.startGame ? "End" : "Play"}
						onClick={this.handlerClickPlay}
					/>
					
					<RaisedButton
						className={this.state.startGame ? "btn btn-next" : "btn btn-next hidden"}
						label="Next"
						onClick={this.handlerClickNext}
					/>
				</div>
				<div className="row-image">
						{listImages}
				</div>
				<Dialog
					title="Winner"
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					Congratulations {this.state.winner}
				</Dialog>
			</Paper>
		);
	}
}



export default AppCubes;
