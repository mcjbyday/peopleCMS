const mod_tab = require('tab');

mod_tab.emitTable({
    'columns': [ {
        'label': 'LEFT COLUMN',
        'align': 'left',
        'width': 20
    }, {
        'label': 'RIGHT COLUMN',
        'align': 'left',
        'width': 20
    }],

    'rows': [
        ["example", "thing"],
        ["example", "another thing"]
    ]
});
