#include<string>
#include<iostream>

using namespace std;

struct struct_type
{
    string title;
    string cloth;
    double price;
    int quantity;
    double tax;
};

int main()
{
    struct_type item[9];

    cin >> item[0].title;
    cin >> item[0].cloth;
    cin >> item[0].price;
    cin >> item[0].quantity;
    cin >> item[0].tax;

    cin >> item[1].title;
    cin >> item[1].cloth;
    cin >> item[1].price;
    cin >> item[1].quantity;
    cin >> item[1].tax;    
    return 0;
}