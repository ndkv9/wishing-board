import React from 'react'

function Footer() {
	const year = new Date().getFullYear()
	const author = 'Vu Nguyen'
	return (
		<footer className='footer'>
			<p>
				Copyright ⓒ {year} by {author}
			</p>
		</footer>
	)
}

export default Footer
