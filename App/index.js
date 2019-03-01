const HTML_FORM = `
<html>
  <head>
    <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css">
    <style>
    button {
      padding: 10px 15px;
      border: none;
      color: white;
    }
    
    input {
      width: 100%;
      height: 48px;
    }
    </style>
  </head>

  <body class="ms-Fabric" dir="ltr">
    <p class="ms-font-su">KnightHacks Azure Functions & Cognitive Services Demo</p>
    <form class="ms-Grid" dir="ltr" action="/api/Submit" method="get">
      <div class="ms-Grid-row">
        <div class="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
            <input name="url" placeholder="url" label="url" class="ms-font-xl" required />
        </div>
        <div class="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
          <button type="submit" class="ms-bgColor-themePrimary ms-font-xl">Find emotions</button>
        </div>
      </div>
    </form>
  </body>
</html>
`

module.exports = async function (context, req) {
    context.res = {
        // status: 200, /* Defaults to 200 */
        headers: { "Content-Type":"text/html" },
        body: HTML_FORM
    };
};
