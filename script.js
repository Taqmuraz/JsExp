function main()
{
    const ctor = (a, b) =>
    ({
        first: a,
        second: b,
        total: () => a + b,
    });
    const label = document.createElement("label");
    label.innerHTML = ctor(10, 20).total();
    document.getElementsByTagName("body")[0].appendChild(label);
}