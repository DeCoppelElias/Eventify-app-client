export default class Group{
    constructor(title, description, public_group, tags) {
        this.title = title;
        this.description = description;
        this.public_group = public_group
        this.tags = tags
        this.events = []
    }

    AddEvents(newEvents){
        this.events.push.apply(this.events, newEvents)
    }
}