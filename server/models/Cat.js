import mongoose from 'mongoose';

const catSchema = mongoose.Schema({
    name: String,
    name_id: String,
    visitCount: {
        type: Number,
        default: 0
    }
}, {collection: 'Cats'});

catSchema.methods.visited = function() {
    this.visitCount += 1;
}

const CatInfo = mongoose.model('CatInfo', catSchema);

export default CatInfo;