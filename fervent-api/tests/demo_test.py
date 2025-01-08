import pytest
import asyncio

pytest_plugins = "pytest_asyncio"

def func(x):
    return x + 5

def test_func():
    assert func(3) == 8


def simple_async():
    return asyncio.sleep(0.5)

@pytest.mark.asyncio
async def test_async_func():
    await simple_async()
    assert True
