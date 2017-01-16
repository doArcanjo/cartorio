Vue.component("test", {
    props: ["data"],
    template: "<a href=\"#\" @click.prevent=\"edit(data.Id)\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> {{data.Id}}</a>",
    methods: {
        edit: function edit(id) {
            console.log(`Edit: ${id}`);
        },
    },
});