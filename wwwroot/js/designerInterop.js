function renderWorkflowDesigner(options) {
    var wfdesigner = new WorkflowDesigner({
        apiurl: options.apiUrl,
        name: 'wfe',
        language: 'en',
        renderTo: options.elementId,
        graphwidth: window.innerWidth - 400,
        graphheight: window.innerHeight - 100,
        showSaveButton: true,
    })

    const data = {
        schemecode: options.schemeCode,
        processid: options.processId
    }

    if (wfdesigner.exists(data)) {
        wfdesigner.load(data)
    } else {
        wfdesigner.create(data.schemecode)
    }
}

function waitForJsAndRender(options) {
    if (typeof window.WorkflowDesigner !== 'undefined') {
        renderWorkflowDesigner(options)
        return
    }

    // the interval here is only needed to wait for the javascript to load with the designer
    const interval = setInterval(() => {
        // if the designer hasn't been uploaded yet, we'll wait a little longer
        if (typeof window.WorkflowDesigner === 'undefined') return

        clearInterval(interval)
        renderWorkflowDesigner(options)
    }, 30)
}
