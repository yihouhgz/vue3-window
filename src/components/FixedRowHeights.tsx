import List from '../../packages/components/list/List'
import { defineComponent } from "vue"

export const FixedRowHeights = defineComponent({
    setup() {
        const names = ["Alice", "Bob", "Charlie", "David", "Edith", "Fred", "Gina", "Helen", "Irene", "James", "Kevin", "Lucy", "Mike", "Nancy", "Olivia", "Peter", "Quinn", "Rachel", "Sarah", "Thomas", "Ursula", "Victor"]
        return () => {
            return (
                <div style="height: 150px;">
                     <List
                        rowComponent={RowComponent}
                        rowCount={names.length}
                        rowHeight={25}
                        rowProps={{ names }}
                    />
               </div>
            )
        }
    }
})

const RowComponent = defineComponent({
    props: {
        index: {
            type: Number,
            required: true
        },
        names: {
            type: Array,
            required: true
        },
    },
    setup(props) {
        return () => {
            const { index, names } = props
            
            return (
                <div class="flex items-center justify-between">
                    {names[index]}
                    <div class="text-slate-500 text-xs">{`${index + 1} of ${names.length}`}</div>
                </div>
            )
        }
    }
})
