<template>
	<div class="login-sign-up">
		<h1> Stride Funding Course Browser</h1>
		<p> Please Sign in or Sign up to browse.</p>
		<div class="togglers">
		<!-- <button > Log in </button> -->
		<!-- <button > Sign up</button> -->
	</div>
		<br><br>

		<form  v-show="showLogin == true" @submit="onLogin" class="login-form">
			<h1>Log in</h1>
			<input v-model="email"  type="email" name="email" placeholder="E-mail" autocomplete="off">
			<input v-model="pw" type="password" name="password" placeholder="Password">
			<button type="submit">Log in</button>
			<p class="red"> {{ errorMsg}} </p>

			<a class="form-toggler" @click="hideLogin"> Don't have an account? Click here to sign up</a>
		</form>

		<form  v-show="showLogin == false" @submit="onSignUp" class="sign-up-form">
			<h1>Sign up</h1>
			<input type="text" v-model="name" name="name" placeholder="Name" autocomplete="off">
			<input v-model="email" type="email" name="email" placeholder="E-mail" autocomplete="off">
			<input v-model="pw" type="password" name="password" placeholder="Password (Min. 8 characters)">
			<input v-model="pw_conf" type="password" name="confirm_password" placeholder="Confirm Password">
			<button type="submit">Sign up</button>
			<p class="red"> {{ errorMsg}} </p>
			<a id="show-login-btn" class="form-toggler" @click="unhideLogin"> Click here to log in </a>
		</form>

		

	</div>
</template>

<script type="text/javascript">
import {  mapActions } from 'vuex';
export default {
	name: "LoginSignUp",
	
	data () {
		return {
			showLogin: true,
			email: 'a@s.com',
			pw: 'rishi',
			pw_conf: '',
			errorMsg: '',
			name:'',
		}
	},
	methods: {
		...mapActions(['login', 'signUp']),
		hideLogin () {
			this.showLogin = false
			this.email = ''
			this.pw = ''
		},
		unhideLogin () {
			this.showLogin = true
			this.email = ''
			this.pw = ''
			this.pw_conf = ''
		},
		onLogin () {
			event.preventDefault()
			let formData = {}
			formData.email = this.email
			formData.password = this.pw
			this.login(formData)
			.then(this.errorMsg = 'Signing you in...')
			.then(this.errorMsg = 'Sucess!')
			.then(() => setTimeout(() => { this.$router.push('/home') }, 1000))
			.catch(() => {
				this.errorMsg = 'Sign in Failed. Please Try Again.'
				setTimeout(() => { this.errorMsg = '' }, 1500);
			})
			setTimeout(() => { this.errorMsg = '' }, 2000);
			this.email = ''
			this.pw = ''
		},
		showError (msg) {
			this.errorMsg = msg
			setTimeout(() => { this.errorMsg = '' }, 1500);
		},
		onSignUp: function (e) {
	      e.preventDefault()

	      const formData = {}
	      const signInData = {}

	      formData.first_name = this.name
	      formData.email = this.email.toLowerCase()
	      formData.password = this.pw

	      signInData.email = this.email
	      signInData.password = this.pw

	      if (this.email === '' || this.pw === '') {
	        this.errorMsg = 'Please fill out forms'
	        setTimeout(() => { this.errorMsg = '' }, 2000)
	        return 0
	      } else if (this.pw !== this.pw_conf) {
	        this.errorMsg = 'Passwords don\'t match'
	        setTimeout(() => { this.errorMsg = '' }, 2000)
	        return 0
	      }
	      this.signUp(formData)
	        .then(this.errorMsg = 'Sign up Succesfull! Signing you in...')
	        .then(() => {
	        	this.login(signInData)
	        	.then(() => (this.errorMsg = 'Sign in Succesful! Redirecting...'))
	            .then(() => setTimeout(() => { this.$router.push('/home') }, 2500))
	        })
	        .catch(() => (this.errorMsg = 'Sign up Failed.'))

	      setTimeout(() => { this.errorMsg = ''; this.email = ''; this.pw = ''; this.name = ''; this.lastName = ''; this.pw_conf = '' }, 2500)
	    }
	}

}

</script>

<style type="text/css">
.login-sign-up {
	width: 100%;
}
.login-sign-up form {
	width: 40%;
  	height: 25rem;
	background-color: white;
	border-radius: 15px;

	margin-left: 33%;
	padding: 5px;
} 
.login-sign-up input {
	display: block;
	margin-left: 13%;
	min-width: 2rem;
	width: 70%;
	height: 1.2rem;
	border-radius: 5px;
	border-color: transparent;
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #F6F7FB;
}

.form-toggler {
	background-color: white;
	color:	black;
	border: 2px;
	border-color: black;
	border-radius: 5px;
	width: 10rem;

}

.form-toggler:hover {
	text-decoration: underline;
}
.login-sign-up form button {
	background-color: #F6F7FB;
	border-color: transparent;
}
.red {
	
}


.togglers {
	/*margin-left: 5%;*/
	font-size: 1.5rem;
}
</style>