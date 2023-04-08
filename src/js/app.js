


document.addEventListener('DOMContentLoaded',function(){
    navegacionFija();
    iniciarApp();
    iniciarFecha();
})

function iniciarApp(){
    crearGaleria();
    scrollNav();
}

function crearGaleria(){
    const galeria= document.querySelector('.galeria-imagenes');
   
    for(let i=1; i<=12; i++){
        /* console.log(i); */
        const  imagen =document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img src="build/img/thumb/${i}.jpg" alt="imagen-galería" width="200" height="300" loading="lazy">`
         
         imagen.onclick =function(){
            mostrarImagen(i);
         }

         galeria.appendChild(imagen);
     }
}

function mostrarImagen(id){
    console.log(id)
    const  imagen =document.createElement('picture');
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img src="build/img/grande/${id}.jpg" alt="imagen-galería" width="200" height="300" loading="lazy">`;

    const  overlay = document.createElement('Div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

 

   const cerrarIMG= document.createElement('P');
   cerrarIMG.textContent='X';
 
   cerrarIMG.classList.add('btn-close')
   
   overlay.appendChild(cerrarIMG);
   overlay.onclick=function(){
    const body = document.querySelector('body');
    body.classList.remove('fijar-body');
     overlay.remove()
   }
   cerrarIMG.onclick=function(){
    const body = document.querySelector('body');
    body.classList.remove('fijar-body');
     overlay.remove()
   }

   const body = document.querySelector('body');

  
   body.appendChild(overlay)
    
   body.classList.add('fijar-body');
  
}

function iniciarFecha(){
    const dateYear= new Date();
    const year= dateYear.getFullYear();
    const putYear = document.querySelector('#putYear');
    putYear.innerHTML= year
}

function scrollNav(){
     const enlaces= document.querySelectorAll('.navegacion-principal a')
     enlaces.forEach(enlace => {
        enlace.addEventListener('click',function(e){
            e.preventDefault();
           /*  console.log(e.target.attributes.href.value); */
           const seccionScroll= e.target.attributes.href.value;
           const seccion = document.querySelector(seccionScroll);
           seccion.scrollIntoView({behavior:'smooth'});
        })
     })
}

function navegacionFija(){
  const barra= document.querySelector('.header');
  const sobreFestival= document.querySelector('.sobre-festival');
  const body= document.querySelector('body')

  window.addEventListener('scroll', function(){
    //obtengo la posicion donde se encunetra el elemento en el dom 
    console.log(sobreFestival.getBoundingClientRect());
    if(sobreFestival.getBoundingClientRect().bottom < 1){
      console.log('Ya pasamos el elemento')
      barra.classList.add('fijo')
      body.classList.add('body-scroll')
    }else{
        console.log('Aun no')
        barra.classList.remove('fijo')
        body.classList.remove('body-scroll')
    }
  })
}