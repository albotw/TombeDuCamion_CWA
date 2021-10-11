# AngularJS

## interpolation de valeurs AngularJS -> Rendu

Pour afficher une variable d'un composant angular dans le rendu (template), on utilise la notation __{{variable}}__ .

>Exemple

```javascript
@Component ({
    selector: "interpolation",
    template: `<div>{{value}}</div>`
})
export class interpolation {
    value : string = "Hello, World!"
}
```

-----

## Envoi de données parent -> enfant (Property Binding)

On indique qu'une variable d'un composant doit être saisie dans la template qui l'appelle avec le décorateur __@Input()__

Pour lui donner une valeur, lorsqu'on appelle l'enfant dans le parent, on indique la variable de l'enfant a définir avec __[variableEnfant] = "valeur"__

> Classe Enfant:

```javascript
@Component ({
    selector: "enfant",
    template: `<span>{{value}}</span>`
})

export class enfant {
    @Input() value : string; // indication que la valeur doit être définie au niveau supérieur
}
```

>Classe Parent:

```javascript
@Component ({
    selector: "parent",
    template: `<enfant [value]="var1"></enfant>` // définition de la valeur avec [variableEnfant] = "valeur" 
})

export class parent {
    var1 : string = "Hello, World! (from the parent)
}

```

-----

## Callback d'évènements Enfant -> Parent (Event Binding)

> Classe Enfant

```javascript
@Component ({
    selector: "enfant",
    template: `<button (click)="foo()">clic clic bandes de salopes</button>`
})
export class enfant {
    message: string = "eh eh c'est morsay ma gueule";
    @Output() buttonClick = new EventEmitter();

    foo() {
        this.buttonClick.emit({value: this.message});
    }
}
```

> Classe Parent

```javascript
@Component ({
    selector: "parent",
    template: `<enfant (buttonClick)="displayMessage($event);"></enfant>`
})
export class parent {
    displayMessage(event) {
        alert(event.value);
    }
}
```

## Two Way Data Binding: EventBinding et PropertyBinding combinés

> Classe Enfant

```javascript
@Component({
    selector: "enfant",
    template: `
        <button (click)="plus()"> PLUS </button>
        <button (click)="moins()"> MOINS </button>
        <label [style.font-size.px]="taille"> FontSize: {{taille}}px</label>
    `
})
export class enfant {
    @Input() taille : number;
    @Output() updateTaille = new EventEmitter<number>();

    plus() {setTaille(+1);}
    moins() {setTaille(-1);}

    setTaille(diff: number) {
        this.taille += diff;
        this.updateTaille.emit(this.taille);
    }
}
```

> Classe parent

```javascript
@Component({
    selector: "parent",
    template: `<enfant [(taille)]="thisTaille"></enfant>
        <div [style.font-size.px]="thisTaille">Texte parent altéré</div> `
})
export class parent{
    thisTaille : number
}

```

## Rendu conditionnel
