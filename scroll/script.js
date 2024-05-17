// Ruta del archivo PDF
var pdfUrl = './mipdf.pdf';

// Obtener el contexto del elemento donde se mostrará el PDF
var pdfContainer = document.getElementById('pdf-content');

// Inicializar el objeto PDF
pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
  // Obtener el número de páginas del PDF
  var numPages = pdf.numPages;

  // Iterar a través de las páginas del PDF
  for (var pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    // Renderizar cada página y agregarla al contenedor
    pdf.getPage(pageNumber).then(function(page) {
      var scale = 1.5;
      var viewport = page.getViewport({scale: scale});

      // Crear un elemento canvas para renderizar la página
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Renderizar la página en el canvas
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);

      // Agregar el canvas al contenedor
      pdfContainer.appendChild(canvas);
    });
  }
}).catch(function(error) {
  console.error('Error al cargar el PDF:', error);
});