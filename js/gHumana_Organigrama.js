$(document).ready(function()
{
  gHumana_Organigrama_iniciarDiagrama();

  $("#btnGHumana_Organigrama_Guardar").on("click", function(evento)
  {
    evento.preventDefault();

    evento.preventDefault();
      var diagrama = gHumana_Organigrama_Diagrama.model.toJson();
      var datos = {
        idDiagrama : $("#txtInicio_idEmpresa").val(),
        idEmpresa : Usuario.idEmpresa,
        idUsuario : Usuario.id,
        Diagrama : diagrama
      };

      $.post('../server/php/proyecto/gHumana_CrearDiagrama.php', datos, function(data, textStatus, xhr) 
      {
        if (!isNaN(data))
        {
          $("#txtGProcesos_Mapa_id").val(data);
          Mensaje("Hey", "Los cambios han sido guardados", 'success');
          gHumana_Organigrama_Diagrama.isModified = false;
        } else
        {
          Mensaje("Error", data, 'danger'); 
        }
      });
  });

  $("#btnGHumana_Organigrama_Cargar").on("click", function(evento)
    {
      evento.preventDefault();
      $.post('../server/php/proyecto/gHumana_CargarDiagrama.php', 
      {
        Usuario :  Usuario.id,
        idEmpresa : $("#txtInicio_idEmpresa").val()
      }, function(data, textStatus, xhr) 
      {
        if (data != 0)
        {
          gHumana_Organigrama_Diagrama.isModified = false;
          $("#txtGHumana_Organigrama_id").val(data.id);
          gHumana_Organigrama_Diagrama.model = go.Model.fromJson(data.Diagrama);
        }
      }, 'json');
    });

  $("#btnGHumana_Organigrama_VerProceso").on("click", function(evento)
  {
    evento.preventDefault();
    var idProceso = $(this).attr("idCargo");
    cargarModulo('gHumana/Cargo.html', 'Ficha de Cargo', function()
    {
      gHumana_Cargo_cargarCargo(idProceso);
    });
  });
});

  function gHumana_Organigrama_iniciarDiagrama() {
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    gHumana_Organigrama_Diagrama =
      $(go.Diagram, "cntGHumana_Organigrama_Diagrama",  // must name or refer to the DIV HTML element
        {
          grid: $(go.Panel, "Grid",
                  $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                  $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
                  $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
                  $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
                ),
          allowDrop: true,  // must be true to accept drops from the Palette
          click: function(e){gHumana_Organigrama_SeleccionarProceso(0, 0)},
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,          
          "rotatingTool.snapAngleMultiple": 15,
          "rotatingTool.snapAngleEpsilon": 15,
          "undoManager.isEnabled": true
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    gHumana_Organigrama_Diagrama.addDiagramListener("Modified", function(e) {
      var idx = document.title.indexOf("*");
      if (gHumana_Organigrama_Diagrama.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
      // the port is basically just a small transparent square
      return $(go.Shape, "Circle",
               {
                  fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                  stroke: null,
                  desiredSize: new go.Size(7, 7),
                  alignment: spot,  // align the port on the main Shape
                  alignmentFocus: spot,  // just inside the Shape
                  portId: name,  // declare this object to be a "port"
                  fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                  fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                  cursor: "pointer"  // show a different cursor to indicate potential link point
               });
    }

    var nodeSelectionAdornmentTemplate =
      $(go.Adornment, "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
        $(go.Placeholder)
      );

    var nodeResizeAdornmentTemplate =
      $(go.Adornment, "Spot",
        { locationSpot: go.Spot.Right },
        $(go.Placeholder),
        $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
      );

    gHumana_Organigrama_Diagrama.nodeTemplate =
      $(go.Node, "Spot",
        { locationSpot: go.Spot.Center },
        {
          click : function(e, nod) {gHumana_Organigrama_SeleccionarProceso(nod.data.key, 1);}
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
        { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
        // the main object is a Panel that surrounds a TextBlock with a Shape
        $(go.Panel, "Auto",
          { name: "PANEL" },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          $(go.Shape, "Rectangle",  // default figure
            {
              portId: "", // the default port: if no spot on link data, use closest side
              fromLinkable: true, toLinkable: true, cursor: "pointer",
              fill: "white",  // default color
              strokeWidth: 2
            },
            new go.Binding("figure"),
            new go.Binding("fill")),
          $(go.TextBlock,
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        // four small named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false),
        { // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function(e, node) { showSmallPorts(node, true); },
          mouseLeave: function(e, node) { showSmallPorts(node, false); }
        }
      );

    function showSmallPorts(node, show) {
      node.ports.each(function(port) {
        if (port.portId !== "") {  // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    }

    var linkSelectionAdornmentTemplate =
      $(go.Adornment, "Link",
        $(go.Shape,
          // isPanelMain declares that this Shape shares the Link.geometry
          { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
      );

    gHumana_Organigrama_Diagrama.linkTemplate =
      $(go.Link,  // the whole link panel
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "Standard", stroke: null }),
        $(go.Panel, "Auto",
          new go.Binding("visible", "isSelected").ofObject(),
          $(go.Shape, "RoundedRectangle",  // the link shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock,
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#919191",
              margin: 2,
              minSize: new go.Size(10, NaN),
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );

    //load();  // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    myPalette =
      $(go.Palette, "cntGHumana_Organigrama_Paleta",  // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          nodeTemplateMap: gHumana_Organigrama_Diagrama.nodeTemplateMap,  // share the templates used by gHumana_Organigrama_Diagrama
          linkTemplate: // simplify the link template, just in this Palette
            $(go.Link,
              { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                // to line up the Link in the same manner we have to pretend the Link has the same location spot
                locationSpot: go.Spot.Center,
                selectionAdornmentTemplate:
                  $(go.Adornment, "Link",
                    { locationSpot: go.Spot.Center },
                    $(go.Shape,
                      { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                    $(go.Shape,  // the arrowhead
                      { toArrow: "Standard", stroke: null })
                  )
              },
              {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 5,
                toShortLength: 4
              },
              new go.Binding("points"),
              $(go.Shape,  // the link path shape
                { isPanelMain: true, strokeWidth: 2 }),
              $(go.Shape,  // the arrowhead
                { toArrow: "Standard", stroke: null })
            ),
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { text: "Cargo (Doble click para editar)" }
          ], [
            // the Palette also has a disconnected Link, which the user can drag-and-drop
            { points: new go.List(go.Point).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
          ])
        });
  }

  // Show the diagram's model in JSON format that the user may edit
  function gHumana_Organigrama_save() {
    saveDiagramProperties();  // do this first, before writing to JSON
    document.getElementById("mySavedModel").value = gHumana_Organigrama_Diagrama.model.toJson();
    gHumana_Organigrama_Diagrama.isModified = false;
  }
  function gHumana_Organigrama_load() {
    gHumana_Organigrama_Diagrama.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    loadDiagramProperties();  // do this after the Model.modelData has been brought into memory
  }

  function gHumana_Organigrama_saveDiagramProperties() {
    gHumana_Organigrama_Diagrama.model.modelData.position = go.Point.stringify(gHumana_Organigrama_Diagrama.position);
  }
  function gHumana_Organigrama_loadDiagramProperties(e) {
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
    var pos = gHumana_Organigrama_Diagrama.model.modelData.position;
    if (pos) gHumana_Organigrama_Diagrama.initialPosition = go.Point.parse(pos);
  }


function gHumana_Organigrama_SeleccionarProceso(key, tipo)
{
  if (tipo == 1)
  {
    $("#btnGHumana_Organigrama_VerProceso").slideDown();
    $("#btnGHumana_Organigrama_VerProceso").attr("idCargo", key);
  } else
  {
    $("#btnGHumana_Organigrama_VerProceso").slideUp();
    $("#btnGHumana_Organigrama_VerProceso").attr("idCargo", 0);
  }
}

