import { IItem } from './index';
import { useState } from 'react';

function compareNumeric(
    a: { isEdit: boolean; text: string; inputText: string; id: number },
    b: { isEdit: boolean; text: string; inputText: string; id: number },
): number {
    if (a.id > b.id) return 1;
    else if (a.id === b.id) return 0;
    else return -1;
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const mouseText = props.initialData.map(function (item) {
        return {
            isEdit: false,
            text: item.name,
            inputText: item.name,
            id: item.id,
        };
    });
    const [objMsg, setMsg] = useState(mouseText);
    if (props.sorting === 'ASC') {
        objMsg.sort(compareNumeric);
    } else {
        objMsg.sort(compareNumeric).reverse();
    }

    function editSave(index: any, event: any) {
        const copy = [...objMsg];
        copy[index].inputText = event.target.value;
        setMsg(copy);
    }
    function editStart(index: number) {
        const copy = [...objMsg];
        copy[index].isEdit = true;
        setMsg(copy);
    }
    function editEnd(index: any, event: any) {
        if (event.keyCode === 13) {
            const copy = [...objMsg];
            copy[index].isEdit = false;
            copy[index].text = copy[index].inputText;
            setMsg(copy);
        } else if (event.keyCode === 27) {
            const copy = [...objMsg];
            copy[index].isEdit = false;
            copy[index].inputText = copy[index].text;
            setMsg(copy);
        }
    }
    const result = objMsg.map((item, index) => {
        let element;
        if (item.isEdit) {
            element = (
                <input
                    autoFocus
                    value={item.inputText}
                    onKeyDown={(event) => editEnd(index, event)}
                    onChange={(event) => editSave(index, event)}
                />
            );
        } else {
            element = <span onClick={() => editStart(index)}>{item.text}</span>;
        }

        return <li key={item.id}>{element}</li>;
    });
    return (
        <div>
            <ol>{result}</ol>
        </div>
    );
}
