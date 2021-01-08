import gql from "graphql-tag";
import { set } from "mongoose";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";

function Register(props) {
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			props.history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return (
		<div className="form-container">
			<Form className={loading ? "loading" : ""} onSubmit={onSubmit} noValidate>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Enter username."
					name="username"
					type="username"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="E-mail"
					placeholder="Enter e-mail."
					name="email"
					type="email"
					value={values.email}
					error={errors.email ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Enter password."
					name="password"
					type="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Confirm password"
					placeholder="Enter your password again."
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
