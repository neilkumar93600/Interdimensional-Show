import React from 'react';
import '../style/App.css'; // Import styles
import music1 from '../asset/1215607_71.jpg'
import music2 from '../asset/1215608_72.jpg'

function Home() {
    return (
        <div className="home-page">
        
        
        {/* Hero Section */}
        <section className="hero-section">
            <div className="hero-content">
            <h1>Welcome to Interdimensional Comedy & Song</h1>
            <p>Your daily dose of intergalactic music and comedy shows.</p>
            <button className="cta-button">Explore Now</button>
            </div>
        </section>
        
        {/* Trending Music Section */}
        <section className="trending-section">
            <h2>Trending Music</h2>
            <div className="grid-container">
            <div className="grid-item">
                <img src={music1} alt="Album 1" />
                <h3>Album Title 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Album 2" />
                <h3>Album Title 2</h3>
            </div>
            <div className="grid-item">
                <img src={music1} alt="Album 3" />
                <h3>Album Title 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Album 4" />
                <h3>Album Title 2</h3>
            </div>
            <div className="grid-item">
                <img src={music1} alt="Album 5" />
                <h3>Album Title 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Album 6" />
                <h3>Album Title 2</h3>
            </div>
            {/* Add more items here */}
            </div>
        </section>
        
        {/* Comedy Show Section */}
        <section className="comedy-section">
            <h2>Comedy Shows</h2>
            <div className="grid-container">
            <div className="grid-item">
                <img src={music1} alt="Comedy Show 1" />
                <h3>Comedy Show 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Comedy Show 2" />
                <h3>Comedy Show 2</h3>
            </div>
            <div className="grid-item">
                <img src={music1} alt="Comedy Show 3" />
                <h3>Comedy Show 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Comedy Show 4" />
                <h3>Comedy Show 2</h3>
            </div>
            <div className="grid-item">
                <img src={music1} alt="Comedy Show 5" />
                <h3>Comedy Show 1</h3>
            </div>
            <div className="grid-item">
                <img src={music2} alt="Comedy Show 6" />
                <h3>Comedy Show 2</h3>
            </div>
            {/* Add more items here */}
            </div>
        </section>
        
        {/* Footer */}
        

                <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="sm:hidden">
                        <label for="tabs" class="sr-only">Select tab</label>
                        <select id="tabs" class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Statistics</option>
                            <option>Services</option>
                            <option>FAQ</option>
                        </select>
                    </div>
                    <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                        <li class="w-full">
                            <button id="stats-tab" data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" class="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Statistics</button>
                        </li>
                        <li class="w-full">
                            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" class="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Services</button>
                        </li>
                        <li class="w-full">
                            <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="false" class="inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">FAQ</button>
                        </li>
                    </ul>
                    <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
                        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                            <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Developers</dd>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Public repositories</dd>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">1000s</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Open source projects</dd>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">1B+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Contributors</dd>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">90+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Top Forbes companies</dd>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <dt class="mb-2 text-3xl font-extrabold">4M+</dt>
                                    <dd class="text-gray-500 dark:text-gray-400">Organizations</dd>
                                </div>
                            </dl>
                        </div>
                        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the world’s potential</h2>
                            {/* List */}
                            <ul  class="space-y-4 text-gray-500 dark:text-gray-400">
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight">Dynamic reports and dashboards</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight">Templates for everyone</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight">Development workflow</span>
                                </li>
                                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight">Limitless business automation</span>
                                </li>
                            </ul>
                        </div>
                        <div class="hidden p-4 bg-white rounded-lg dark:bg-gray-800" id="faq" role="tabpanel" aria-labelledby="faq-tab">
                            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                                <h2 id="accordion-flush-heading-1">
                                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                                    <span>What is Flowbite?</span>
                                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                    </button>
                                </h2>
                                <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
                                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                                    </div>
                                </div>
                                <h2 id="accordion-flush-heading-2">
                                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                                    <span>Is there a Figma file available?</span>
                                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                    </button>
                                </h2>
                                <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
                                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                                    </div>
                                </div>
                                <h2 id="accordion-flush-heading-3">
                                    <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                                    <span>What are the differences between Flowbite and Tailwind UI?</span>
                                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                    </button>
                                </h2>
                                <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
                                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                    <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
                                        <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                        <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
                    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                            <p class="my-4">If you care for your time, I hands down would go with this."</p>
                        </blockquote>
                        <figcaption class="flex items-center justify-center ">
                            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile "/>
                            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                <div>Bonnie Green</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at Open AI</div>
                            </div>
                        </figcaption>    
                    </figure>
                    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                            <p class="my-4">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                        </blockquote>
                        <figcaption class="flex items-center justify-center ">
                            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile "/>
                            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                <div>Roberta Casas</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                            </div>
                        </figcaption>    
                    </figure>
                    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                            <p class="my-4">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                        </blockquote>
                        <figcaption class="flex items-center justify-center ">
                            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile "/>
                            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                <div>Jese Leos</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
                            </div>
                        </figcaption>    
                    </figure>
                    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                            <p class="my-4">You have many examples that can be used to create a fast prototype for your team."</p>
                        </blockquote>
                        <figcaption class="flex items-center justify-center ">
                            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile " />
                            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                <div>Joseph McFall</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">CTO at Google</div>
                            </div>
                        </figcaption>    
                    </figure>
                </div>


        </div>
    );
}

export default Home;
