import firebase from './firebase';
import 'firebase/firestore'
import 'firebase/functions';

export default class Popup extends Component{
    render() {
        return (
            <div id="outer-container">
            <main id="page-wrap">
            <Grid centered>
            <Grid.Row id="row1" >
                <Grid.Column mobile={16} tablet={16} computer={10}>
                <div>
                <List selection bulleted>
                    article.
                </List>
                </div>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </main>          
     </div>
        )
    }
}