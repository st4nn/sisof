$(document).ready(function()
{
	gProcesos_Mapa_IniciarDiagrama();
});


function gProcesos_Mapa_IniciarDiagrama() {
    var $ = go.GraphObject.make;

    myDiagram =
      $(go.Diagram, "cntGProcesos_Mapa_Diagrama",
        {
          allowDrop: true, // from Palette
          // what to do when a drag-drop occurs in the Diagram's background
          mouseDrop: function(e) { finishDrop(e, null); },
          click: function(e){console.log('click diagram', e);},
          layout:  // Diagram has simple horizontal layout
            $(go.GridLayout,
              { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
          initialContentAlignment: go.Spot.Center,
          "commandHandler.archetypeGroupData": { isGroup: true, category: "OfNodes" },
          "undoManager.isEnabled": true
        });

    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    function makePort(name, spot, output, input) {
      // the port is basically just a small circle that has a white stroke when it is made visible
      return $(go.Shape, "Circle",
               {
                  fill: "transparent",
                  stroke: null,  // this is changed to "white" in the gProcesos_Mapa_showPorts function
                  desiredSize: new go.Size(8, 8),
                  alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                  portId: name,  // declare this object to be a "port"
                  fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                  fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                  cursor: "pointer"  // show a different cursor to indicate potential link point
               });
    };

     function nodeStyle() {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
          //isShadowed: true,
          //shadowColor: "#888",
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function (e, obj) { gProcesos_Mapa_showPorts(obj.part, true); },
          mouseLeave: function (e, obj) { gProcesos_Mapa_showPorts(obj.part, false); }
        }
      ];
    };

    // There are two templates for Groups, "OfGroups" and "OfNodes".

    // this function is used to highlight a Group that the selection may be dropped into
    function highlightGroup(e, grp, show) {
      if (!grp) return;
      e.handled = true;
      if (show) {
        // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
        // instead depend on the DraggingTool.draggedParts or .copiedParts
        var tool = grp.diagram.toolManager.draggingTool;
        var map = tool.draggedParts || tool.copiedParts;  // this is a Map
        // now we can check to see if the Group will accept membership of the dragged Parts
        if (grp.canAddMembers(map.toKeySet())) {
          grp.isHighlighted = true;
          return;
        }
      }
      grp.isHighlighted = false;
    }

    // Upon a drop onto a Group, we try to add the selection as members of the Group.
    // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
    // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
    function finishDrop(e, grp) {
      var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
      if (!ok) e.diagram.currentTool.doCancel();
    }

    myDiagram.groupTemplateMap.add("OfGroups",
      $(go.Group, "Auto", nodeStyle(),
        {
          background: "transparent",
          // highlight when dragging into the Group
          mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
          // Groups containing Groups lay out their members horizontally
          layout:
            $(go.GridLayout,
              { wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                  cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4) })
        },
        new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        $(go.Shape, "Rectangle",
          { fill: null, stroke: "#FFDD33", strokeWidth: 2 }),
        $(go.Panel, "Vertical",  // title above Placeholder
          $(go.Panel, "Horizontal",  // button next to TextBlock
            { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
            $("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 14px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay()),
              makePort("R", go.Spot.Right, true, true)
          ),  // end Horizontal Panel
          $(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )  // end Vertical Panel
      ));  // end Group and call to add to template Map

    myDiagram.groupTemplateMap.add("OfNodes",
      $(go.Group, "Auto", nodeStyle(),
        {
          background: "transparent",
          ungroupable: true,
          // highlight when dragging into the Group
          mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
          // Groups containing Nodes lay out their members vertically
          layout:
            $(go.GridLayout,
              { wrappingColumn: 1, alignment: go.GridLayout.Position,
                  cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4) })
        },
        new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        $(go.Shape, "Rectangle",
          { fill: null, stroke: "#33D3E5", strokeWidth: 2 }),
        $(go.Panel, "Vertical",  // title above Placeholder
          $(go.Panel, "Horizontal",  // button next to TextBlock
            { stretch: go.GraphObject.Horizontal, background: "#33D3E5" },
            $("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 14px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay()),
              makePort("R", go.Spot.Right, true, true)
          ),  // end Horizontal Panel
          $(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )  // end Vertical Panel
      ));  // end Group and call to add to template Map

    myDiagram.nodeTemplate =
      $(go.Node, "Auto", nodeStyle(),
        { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
          mouseDrop: function(e, nod) { finishDrop(e, nod.containingGroup); },
          click : function(e, nod){ console.log(nod.data.key);}
        },
        $(go.Shape, "Rectangle",
          { fill: "#ACE600", stroke: null },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          {
            margin: 10,
            editable: true,
            font: "bold 14px sans-serif",
            opacity: 0.75,
            stroke: "#404040"
          },
          new go.Binding("text", "text").makeTwoWay()),
          makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false)
      );

    // initialize the Palette and its contents
    myPalette =
      $(go.Palette, "cntGProcesos_Mapa_Paleta",
        {
          nodeTemplateMap: myDiagram.nodeTemplateMap,
          groupTemplateMap: myDiagram.groupTemplateMap,
          layout: $(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Position })
        });
    myPalette.model = new go.GraphLinksModel([
      { text: "Proceso", color: "#ACE600" },
      { text: "Sub Grupo", color: "#FFDD33" , "isGroup":true, "category":"OfNodes", "group":2},
      { text: "Grupo", color: "#33D3E5", "isGroup":true, "category":"OfGroups"}
    ]);
    gProcesos_Mapa_CargarElUltimo();
  }

  function gProcesos_Mapa_CargarElUltimo()
  {
    $("#btnGProcesos_Mapa_Cargar").trigger("click");
  }

  $("#btnGProcesos_Mapa_Guardar").on("click", function(evento)
    {
      evento.preventDefault();
      var diagrama = myDiagram.model.toJson();
      var datos = {
        idDiagrama : $("#txtGProcesos_Mapa_id").val(),
        idEmpresa : Usuario.idEmpresa,
        idUsuario : Usuario.id,
        Diagrama : diagrama
      };

      $.post('../server/php/proyecto/gProcesos_CrearDiagrama.php', datos, function(data, textStatus, xhr) 
      {
        if (!isNaN(data))
        {
          $("#txtGProcesos_Mapa_id").val(data);
          Mensaje("Hey", "Los cambios han sido guardados", 'success');
          myDiagram.isModified = false;
        } else
        {
          Mensaje("Error", data, 'danger'); 
        }
      });
    });

  $("#btnGProcesos_Mapa_Cargar").on("click", function(evento)
  {
    $.post('../server/php/proyecto/gProcesos_CargarDiagrama.php', 
      {
        Usuario :  Usuario.id,
        idEmpresa : Usuario.idEmpresa
      }, function(data, textStatus, xhr) 
      {
        if (data != 0)
        {
          myDiagram.isModified = false;
          $("#txtGProcesos_Mapa_id").val(data.id);
          myDiagram.model = go.Model.fromJson(data.Diagrama);
        }
      }, 'json');
  });


  function gProcesos_Mapa_showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port) {
        port.stroke = (show ? "white" : null);
      });
  }
