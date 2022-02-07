import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("render two input text elements", () => {
    const wrapper = mount(App, {});
    const inputs = wrapper.findAll("input");
    expect(inputs.length).toBe(2);
  });

  it("search for 'san francisco'", async () => {
    const wrapper = mount(App, {});
    const input = wrapper.findAll("input").at(0);
    await input.setValue("san francisco");
    const results = wrapper.find(".results");
    expect(results.text()).toContain("san francisco");
  });

  it("display no results box", async () => {
    const wrapper = mount(App, {});
    const input = wrapper.findAll("input").at(0);
    await input.setValue("sss");
    const results = wrapper.find(".results");
    expect(results.text()).toContain("No results found");
  });

  it("don't search with 2 chars", async () => {
    const wrapper = mount(App, {});
    const input = wrapper.findAll("input").at(1);
    await input.setValue("do");
    const results = wrapper.find(".results");
    expect(results.exists()).toBe(false);
  });

  it("select 'Robison Crusoe' with keyboard", async () => {
    const wrapper = mount(App, {});
    const input = wrapper.findAll("input").at(1);
    await input.setValue("rob");
    await wrapper.trigger("keydown.enter");
    const p = wrapper.find(".author");
    expect(p.text()).toContain("Daniel Defoe");
  });

  it("select 'san juan' with click", async () => {
    const wrapper = mount(App, {});
    const input = wrapper.findAll("input").at(0);
    await input.setValue("san");
    const li = wrapper.findAll(".results li").at(4);
    await li.trigger("click");
    const p = wrapper.find("strong");
    expect(p.text()).toMatch("san juan");
  });
});
