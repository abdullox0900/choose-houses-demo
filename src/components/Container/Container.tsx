import { ChildrenType } from '@/types/children'

const Container = (props: ChildrenType) => {
    return (
        <div style={props.style} className={`${props.class} container mx-auto`}>
            {props.children}
        </div>
    )
}

export default Container
