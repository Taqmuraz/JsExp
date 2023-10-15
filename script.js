function main()
{
    const ctor = (a, b) =>
    {return {
        first: a,
        second: b,
        total: () => a + b,
    }};
    console.log(ctor(10, 20).total())
}