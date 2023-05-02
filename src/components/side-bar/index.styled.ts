import styled from "styled-components";

export const SideWrapper = styled.div`
	max-width: 200px;
	background-color: #2B2D42;
	display: flex;
	flex-direction: column;
	padding: 15px;
`;

export const Button = styled.button`
	border-width: 2px;
	border-style: outset;
	border-color: buttonface;
	border-right-color: #424242;
	border-bottom-color: #424242;
	background: silver;
	color: black;
	padding: 5px;
	border-radius: 1px;
	&:hover {
		border: 2px inset #fff;
		background: silver;
		color: #424242;
		box-shadow: -1px -1px #000;
	}
	&:focus {
		border: 2px inset #fff !important;
		background: silver;
		color: #424242;
		box-shadow: -1px -1px #000 !important;
		outline: 0 !important;
	}
	&:active {
		border: 2px inset #fff !important;
		color: #424242;
		box-shadow: -1px -1px #000 !important;
		outline: 0 !important;
	}
	&:disabled{
		cursor: default;
		background-color: silver;
		border-style: outset;
		border-color: buttonface;
		border-right-color: #424242;
		border-bottom-color: #424242;
		color: grey;
		text-shadow: 1px 1px #fff;
	}
`;

export const InputWrapper = styled.div`
  display: flex;
`;

export const Input = styled.input`
  width: 100px;
`;
