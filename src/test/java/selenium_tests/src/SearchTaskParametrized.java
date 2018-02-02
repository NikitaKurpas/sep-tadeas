package selenium_tests.src;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;
import utils.*;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RunWith(value = Parameterized.class)
@SuppressWarnings("Duplicates")
public class SearchTaskParametrized {

  String strTaskName;

  private static WebDriver driver;
  private static LoginPage login;
  private static TaskListPage tasks;

  public SearchTaskParametrized(String strTaskName) {
    this.strTaskName = strTaskName;
  }


  @BeforeClass
  public static void setUp() {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(Constansts.IMPLICIT_WAIT, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
    try {
      login.login("Alice", "12345");
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    tasks = new TaskListPage(driver);
  }

  @Parameterized.Parameters(name = "Search for: {0}")
  public static Collection<String[]> testingData() {
    return CSVfileReader.readCSVfileToCollection("target/classes/search_task.csv");
  }

  @Test
  public void testWithGrid() {

    Assert.assertTrue(tasks.containsTask(1, "TADEAS 1", "1",
      "2017-11-01", true));
    Assert.assertTrue(tasks.containsTask(2, "TADEAS 2", "1",
      "2017-11-02", true));
    Assert.assertTrue(tasks.containsTask(3, "TADEAS 3", "1",
      "2017-12-03", false));
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }

}
