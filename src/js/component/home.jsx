import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [userData, setuserData] = useState({}); // Almacenar datos del usuario
	const [todo, setTodo] = useState(''); // Almacenar todo

	// MAKE REQUEST TO THE API /////////////////////////////////////////////////////////////////
	useEffect(() => {
		
		createUser();
		getUserData();
		//createTask();

	}, []); // El array de dependencias vacío asegura que el efecto solo se ejecuta al montar el componente.


	// POST ////////////////////////////////////////////////////////////////////////////////////
	const createUser = () => { // fetch(url, {options}).then(reply => reply.json()).then(data => console.log(data)).catch(error => console.log(error))
		fetch('https://playground.4geeks.com/todo/users/ViesK', {	
			method: 'POST',	// Método de la solicitud (POST en este caso).
			headers: {'Content-type': 'application/json'}	// Especifica que el contenido es de tipo JSON.
		})
		.then(reply => {
			console.log('answer', reply);
			if (!reply) throw new Error('error requesting users');
			return reply.json();
		})
		.then(data => console.log('data now', data)) 
		.catch(error => console.log(error)); 
	}


	// GET ////////////////////////////////////////////////////////////////////////////////////
	const getUserData = () => {
		fetch('https://playground.4geeks.com/todo/users/ViesK') // 1. Realiza una solicitud a la API.
		.then(reply => {  // 2. Maneja la respuesta de la solicitud.
			console.log('answer', reply); // 3. Muestra la respuesta completa en la consola.
			if (!reply) throw new Error('error requesting users'); // 4. Verifica si la respuesta es válida; si no, lanza un error (Error es un constructor. error una variable).
			return reply.json(); //.parsed(stringifield) 5. Convierte la respuesta en un objeto JSON para poder usar los datos.
		})
		.then(data => {
			console.log('data now', data) // 6. Muestra los datos convertidos a JSON en la consola.
			setuserData(data)
		})
		.catch(error => console.log(error)); // 7. Captura y muestra cualquier error en la consola.
	};


	// POST TO CREATE TASK ////////////////////////////////////////////////////////////////////////
	const createTask = () => {
		fetch('https://playground.4geeks.com/todo/todos/ViesK', {	
			method: 'POST',	// Método de la solicitud (POST en este caso).
			headers: {'Content-type': 'application/json'},	// Especifica que el contenido es de tipo JSON.
			body: JSON.stringify({label: todo, done: false}),
		})
		.then(reply => {
			console.log('answer', reply);
			if (!reply) throw new Error('error requesting users');
			return reply.json();
		})
		.then(data => {
			console.log('create data now', data)
			getUserData()
			setTodo('');
		}) 
		.catch(error => console.log(error)); 
	};


	// DELETE ////////////////////////////////////////////////////////////////////////////////////
	const handleDelete = (id) => { 
		console.log(id)
		fetch('https://playground.4geeks.com/todo/todos/'+ id, {	
			method: 'DELETE',	
			headers: {'Content-type': 'application/json'}	
		})
		.then(reply => {
			console.log('answer', reply);
			if (!reply) throw new Error('error requesting users');
			getUserData()
		})
		.catch(error => console.log(error)); 
	}


	const handleSubmit = e => {
		e.preventDefault();
		createTask();
	}

	return (
		<div className="home__container">

			<label className="home__label fs-5">ToDo List With Fetch</label>

			<form onSubmit={handleSubmit}>
				<input
					placeholder="TYPE HERE"
					className="home__input"
					type="text" 
					value={todo} 
					onChange={e => setTodo(e.target.value)} 
				/>

				<input
                    type="submit"
                    value="Add"
                    className="home__input home__input--button"
                />
			</form>
			
			<div className="home__label home__label--list p-3 pb-1 ps-4">
				<label className="mb-3">TASKS LIST:</label>

				<ul className="p-0 me-2">
					{userData.todos?.length > 0 
						? userData.todos.map(task => 
						<li className="my-2 d-flex justify-content-between" key={task.id}> 

							<span className="home__label--white"> {task.label} </span> 

							<span 
								className="home__deleteIcon ms-4" 
								onClick={e => handleDelete(task.id)}>
									<i className="fa-regular fa-trash-can"></i>
							</span>
							
						</li>): 'no tasks'
					}
				</ul>
			</div>
			

		</div>
	);
};   

export default Home;
