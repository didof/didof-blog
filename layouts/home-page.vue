<template>
	<section class="hero is-info is-fullheight">
		<!-- Hero head: will stick at the top -->
		<div class="hero-head">
			<header class="navbar">
				<div class="container is-fluid">
					<div class="navbar-brand">
						<NuxtLink to="/blog"><h2 class="title">BLOG</h2></NuxtLink>
						<span class="navbar-burger" data-target="navbarMenuHeroC">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</div>
					<div id="navbarMenuHeroC" class="navbar-menu">
						<div class="navbar-end">
							<a class="navbar-item is-active"> Home </a>
							<a class="navbar-item"> Examples </a>
							<a class="navbar-item"> Documentation </a>
							<span class="navbar-item">
								<a class="button is-success is-inverted">
									<span class="icon">
										<i class="fab fa-github"></i>
									</span>
									<span>Download</span>
								</a>
							</span>
						</div>
					</div>
				</div>
			</header>
		</div>

		<!-- Hero content: will be in the middle -->
		<div class="hero-body">
			<Nuxt />
		</div>

		<!-- Hero footer: will stick at the bottom -->
		<div class="hero-foot">
			<nav class="tabs is-boxed is-fullwidth">
				<div class="container">
					<ul>
						<li class="is-active"><a>Overview</a></li>
						<li><a>Modifiers</a></li>
						<li><a>Grid</a></li>
						<li><a>Elements</a></li>
						<li><a>Components</a></li>
						<li><a>Layout</a></li>
					</ul>
				</div>
			</nav>
		</div>
	</section>
</template>
